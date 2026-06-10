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

    it('Toggle Todo item, active/done', () => {

        let task_random = Math.random().toString(36).substring(2)
        cy.get('input[placeholder="Title of your Task"]')
            .type(task_random)

        cy.contains('Create new Task').click()
        cy.contains(task_random).click()

        cy.get('li.todo-item')
            .find('span.checker')
            .click();

        cy.get('li.todo-item')
            .find('span.checker')
            .should('have.class', 'checked');
    })

        it('Toggle Todo item, active/done', () => {

        let task_random = Math.random().toString(36).substring(2)
        cy.get('input[placeholder="Title of your Task"]')
            .type(task_random)

        cy.contains('Create new Task').click()
        cy.contains(task_random).click()

        cy.get('li.todo-item')
            .find("span.checker")
            .click();  

        cy.get('li.todo-item')
            .find("span.checker")
            .should("have.class", "unchecked"); 
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
