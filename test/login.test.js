import assert from 'assert';
import { Builder, Browser, By, Key, until } from 'selenium-webdriver';

describe('Teste do módulo Login', function () {

    this.timeout(30000);

    it('Deve realizar login com sucesso', async function () {

        const driver = await new Builder()
            .forBrowser(Browser.FIREFOX)
            .build();

        try {

            await driver.manage().setTimeouts({
                implicit: 10000,
                pageLoad: 20000,
                script: 20000
            });

            await driver.get('https://quick-notes.club/');

            await driver.findElement(By.id('login-email'))
                .sendKeys('test@dor.com');

            await driver.findElement(By.id('login-password'))
                .sendKeys('12345678', Key.RETURN);

            const elementoUsuario = await driver.wait(
                until.elementLocated(By.id('user-name')),
                10000
            );

            await driver.wait(
                until.elementIsVisible(elementoUsuario),
                10000
            );

            const saudacao = await elementoUsuario.getText();

            assert.equal(saudacao, 'Hi, Testador');

        } finally {

            await driver.quit();
        }
    });
});