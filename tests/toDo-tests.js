import { Selector } from 'testcafe';

fixture `ToDo`
    .page `http://localhost:5173/`;

test('Add new task', async t => {
    await t
        .typeText('#task', 'New Task')
        .click('#addTask')
        .expect(Selector('#tasks').innerText).contains('New Task');
});