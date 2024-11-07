import { Selector } from 'testcafe';

fixture("Todo App Tests")
    .page("https://test.bimmersen365.dk/todo/");

test("Adding a task", async t => {
    await t 
        .typeText('#todo-input', 'Do the dishes')
        .click('#add-todo')
        .expect(Selector('li').innerText).contains('Do the dishes')
        .click('#remove');
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
        .expect(Selector('li').innerText).contains('Edited todo')
        .click('#remove');
});

test("Toggling dark mode", async t => {
    const themeToggleButton = Selector('#theme-toggle-button');

    await t
        .click(themeToggleButton)
        .expect(themeToggleButton.hasClass('dark-mode')).ok('Dark mode should be activated');
});

test("Progress bar updates correctly", async t => {
    const progressBar = Selector('#todo-progress-bar');
    const progressText = Selector('#progress-text');

    // Check initial state of the progress bar
    await t
        .expect(Number(await progressBar.getAttribute('value'))).eql(0, 'Progress bar should start at 0')
        .expect(progressText.innerText).eql('0%', 'Progress text should start at 0%');

    // Add and complete the first task, then verify progress
    await t
        .typeText('#todo-input', 'Do the dishes')
        .click('#add-todo')
        // Use a more specific selector for the checkbox inside the list item
        .click(Selector('li').withText('Do the dishes').find('input[type="checkbox"]'))
        .expect(Number(await progressBar.getAttribute('value'))).eql(25, 'Progress bar should update to 25% after first task')
        .expect(progressText.innerText).eql('25%', 'Progress text should show 25%');

    // Add and complete the second task, then verify progress
    await t
        .typeText('#todo-input', 'Take out the trash')
        .click('#add-todo')
        .click(Selector('li').withText('Take out the trash').find('input[type="checkbox"]'))
        .expect(Number(await progressBar.getAttribute('value'))).eql(50, 'Progress bar should update to 50% after second task')
        .expect(progressText.innerText).eql('50%', 'Progress text should show 50%');

    // Add and complete the third task
    await t
        .typeText('#todo-input', 'Mow the lawn')
        .click('#add-todo')
        .click(Selector('li').withText('Mow the lawn').find('input[type="checkbox"]'))
        .expect(Number(await progressBar.getAttribute('value'))).eql(75, 'Progress bar should update to 75% after third task')
        .expect(progressText.innerText).eql('75%', 'Progress text should show 75%');

    // Add and complete the fourth task
    await t
        .typeText('#todo-input', 'Wash the car')
        .click('#add-todo')
        .click(Selector('li').withText('Wash the car').find('input[type="checkbox"]'))
        .expect(Number(await progressBar.getAttribute('value'))).eql(100, 'Progress bar should reach 100% after all tasks')
        .expect(progressText.innerText).eql('100%', 'Progress text should show 100%');
});