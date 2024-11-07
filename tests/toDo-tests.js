import { Selector } from 'testcafe';

fixture("Todo App Tests")
    .page("https://test.bimmersen365.dk/todo/");

test("Adding a task", async t => {
    await t 
        .typeText('#todo-input', 'Do the dishes')
        .click('#add-todo')
        .expect(Selector('li').innerText).contains('Do the dishes');
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
        .expect(Selector('li').innerText).contains('Help with homework')
        .click('#edit')
        .expect(Selector('li').innerText).contains('Edited todo');
});

test("Toggling dark mode", async t => {
    const themeToggleButton = Selector('#theme-toggle-button');

    await t
        .click(themeToggleButton)
        .expect(themeToggleButton.hasClass('dark-mode')).ok('Dark mode should be activated');
});
