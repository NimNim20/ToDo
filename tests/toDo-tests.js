import { Selector } from 'testcafe';

fixture("Todo App Tests")
    .page("https://test.bimmersen365.dk/todo/");

test("Adding a task", async t => {
    await t 
        .typeText('#todo-input', 'Do the dishes')
        .click('#add-todo')
        .expect(Selector('li').withText('Do the dishes').exists).ok()
        .click(Selector('li').withText('Do the dishes').find('#remove'));
});

test("Editing a todo", async t => {
    await t
        .setNativeDialogHandler((type, text) => {
            if (type === 'prompt') {
                return 'Edited todo';
            }  
        })
        .typeText('#todo-input', 'Help with homework')
        .click('#add-todo')
        .expect(Selector('li').withText('Help with homework').exists).ok()
        .click(Selector('li').withText('Help with homework').find('#edit'))
        .expect(Selector('li').withText('Edited todo').exists).ok()
        .click(Selector('li').withText('Edited todo').find('#remove'));
});

test("Toggling dark mode", async t => {
    const themeToggleButton = Selector('#theme-toggle-button');
    const bodyElement = Selector('body');

    await t
        .click(themeToggleButton)
        .expect(bodyElement.hasClass('dark-mode')).ok('Dark mode should be activated');
});

test('Category selector should change the category of a new todo item', async t => {
    const categorySelect = Selector('#category-select');
    
    const todoInput = Selector('#todo-input');
    const addTodoButton = Selector('#add-todo');
    
    await t
        .typeText(todoInput, 'My first todo')
        .click(categorySelect)
        .click(categorySelect.find('option').withText('Home')) 
        .click(addTodoButton);
});