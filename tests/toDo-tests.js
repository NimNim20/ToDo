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

test("Progress bar updates correctly", async t => {
    const progressBar = Selector('#todo-progress-bar');
    const progressText = Selector('#progress-text');

    // Initial state check
    await t
        .expect(progressBar.value).eql(0, 'Progress bar should start at 0')
        .expect(progressText.innerText).eql('0%', 'Progress text should start at 0%');

    // Add a task and update progress
    await t
        .typeText('#todo-input', 'Do the dishes')
        .click('#add-todo')
        .click('#check-task')  // Assuming #check-task checks off a task to increment progress
        .expect(progressBar.value).eql(25, 'Progress bar should update to 25%')
        .expect(progressText.innerText).eql('25%', 'Progress text should show 25%');

    // Repeat for other tasks
    await t
        .typeText('#todo-input', 'Take out the trash')
        .click('#add-todo')
        .click('#check-task')
        .expect(progressBar.value).eql(50, 'Progress bar should update to 50%')
        .expect(progressText.innerText).eql('50%', 'Progress text should show 50%');

    await t
        .typeText('#todo-input', 'Mow the lawn')
        .click('#add-todo')
        .click('#check-task')
        .expect(progressBar.value).eql(75, 'Progress bar should update to 75%')
        .expect(progressText.innerText).eql('75%', 'Progress text should show 75%');

    await t
        .typeText('#todo-input', 'Wash the car')
        .click('#add-todo')
        .click('#check-task')
        .expect(progressBar.value).eql(100, 'Progress bar should reach 100%')
        .expect(progressText.innerText).eql('100%', 'Progress text should show 100%');
});