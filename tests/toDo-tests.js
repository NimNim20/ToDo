import { Selector } from 'testcafe';

fixture `ToDo`
    .page `https://test.bimmersen365.dk/todo/`;

test('Add new task', async t => {
    await t
        .typeText('#task', 'New Task')
        .click('#addTask')
        .expect(Selector('#tasks').innerText).contains('New Task');
});