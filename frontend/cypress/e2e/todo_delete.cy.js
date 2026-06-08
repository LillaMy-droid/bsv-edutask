describe('Todo tests', () => {

    let uid
    let name
    let email

    before(function () {
        cy.fixture('user.json')
        .then((user) => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:5000/users/create',
                form: true,
                body: user
            }).then((response) => {
                uid = response.body._id.$oid
                name = user.firstName + ' ' + user.lastName
                email = user.email
            })
        })
    })

    beforeEach(() => {

        cy.visit('http://localhost:3000')
        cy.viewport(1920, 1080)

        cy.contains('div', 'Email Address')
            .find('input[type=text]')
            .type(email)
    
        cy.get('form')
        .submit()

        cy.get('h1')
        .should('contain.text', 'Your tasks, ' + name)
    })

    it('Delete Todo item', () => {

        cy.intercept('DELETE', '/todos/byid/*').as('deleteTodo')
        cy.intercept('GET', '/tasks/**').as('refreshTasks')

        let task_random = Math.random().toString(36).substring(2)
        let todo_random = Math.random().toString(36).substring(2)

        cy.get('input[placeholder="Title of your Task"]')
            .type(task_random)

        cy.contains('Create new Task')
            .click()

        cy.contains('.title-overlay', task_random)
            .click()

        cy.get('input[placeholder="Add a new todo item"]')
            .type(todo_random)

        cy.contains('Add')
            .click()

        cy.contains('li.todo-item', todo_random)
            .should('exist')

        cy.contains('li.todo-item', todo_random)
            .find('span.remover')
            .click()

        cy.wait('@deleteTodo')
        cy.wait('@refreshTasks')

        cy.contains('li.todo-item', todo_random)
            .should('not.exist')
    })

    after(function () {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:5000/users/${uid}`
        }).then((response) => {
            cy.log(response.body)
        })
    })
})
