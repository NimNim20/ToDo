import { Selector } from 'testcafe';

fixture ("Adding a task to the list")
    .page("https://test.bimmersen365.dk/todo/");

test("Adding a task", async t => {
    await t 
    .typeText('#todo-input' , 'Do the dishes')
    .click ('#add-todo')
    .expect(Selector('li').innerText).contains('Do the dishes')
})


test ("Editing a todo", async t => {
await t
.setNativeDialogHandler((type, text) => {
    switch (type) {
        case 'prompt':
            return 'Edited todo';
    }  
})

test ("Editing a todo", async t => {
    await t
    .typeText('#todo-input' , 'Help with homework')
    .click ('#add-todo')
    .expect(Selector('li').innerText).contains('Help with homework')
    .click('#edit')
    .expect(Selector('li').innerText).contains('Edited todo');
})

test ("Toggling dark mode", async t => {
    await t
    .click('#theme-toggle-button')
    .expect(Selector('button').hasClass('dark-mode')).ok()
    .click('#theme-toggle-button')
    .expect(Selector('body').hasClass('dark-mode')).notOk()
})

});