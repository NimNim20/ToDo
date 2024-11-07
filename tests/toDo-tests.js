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

test("Progress bar updates correctly", async t => {
    const progressBar = Selector('#todo-progress-bar');
    const progressText = Selector('#progress-text');

    await t
    .expect(progressBar.getAttribute('value')).eql('0', 'Progress bar should start at 0%')
    .expect(progressText.innerText).eql('0%', 'Progress text should start at 0%');

    await t
    .typeText('#todo-input', 'Do the dishes')
    .click('#add-todo')
    .click(Selector('li').withText('Do the dishes').find('input[type="checkbox"]'))
    .expect(progressBar.getAttribute('value')).eql('100', 'Progress bar should update to 100% after first task')
    .expect(progressText.innerText).eql('100%', 'Progress text should show 100%');
});
