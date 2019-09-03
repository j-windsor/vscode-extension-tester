import { ViewItem } from "../ViewItem";
import { ExtensionsViewSection } from "./ExtensionsViewSection";
import { By, until } from "selenium-webdriver";
import { ContextMenu } from "../../menu/ContextMenu";

/**
 * Page object representing an extension in the extensions view
 */
export class ExtensionsViewItem extends ViewItem {
    private title: string;

    constructor(title: string, section: ExtensionsViewSection) {
        super(By.xpath(`.//div[contains(@class, 'monaco-list-row') and .//span/text()='${title}']`), section);
        this.title = title;
    }

    async select(): Promise<void> {
        await this.click();
    }

    /**
     * Get title of the extension
     */
    getTitle(): string {
        return this.title;
    }

    /**
     * Get version of the extension
     */
    async getVersion(): Promise<string> {
        const version = await this.findElement(By.className('version'));
        return await version.getText();
    }

    /**
     * Get the author of the extension
     */
    async getAuthor(): Promise<string> {
        const author = await this.findElement(By.className('author'));
        return await author.getText();
    }

    /**
     * Get the description of the extension
     */
    async getDescription(): Promise<string> {
        const description = await this.findElement(By.className('description'));
        return await description.getText();
    }
    
    /**
     * Find if the extension is installed
     */
    async isInstalled(): Promise<boolean> {
        const button = await this.findElement(By.className('install'));
        if ((await button.getAttribute('class')).indexOf('disabled') > -1) {
            return true;
        }
        return false;
    }

    /**
     * Open the management context menu if the extension is installed
     */
    async manage(): Promise<ContextMenu> {
        const button = await this.findElement(By.className('manage'));
        if ((await button.getAttribute('class')).indexOf('disabled') > -1) {
            throw new Error(`Extension '${this.title}' is not installed`);
        }
        return await this.openContextMenu();
    }

    /**
     * Install the extension if not installed already
     */
    async install(): Promise<void> {
        if (await this.isInstalled()) {
            return;
        }
        const button = await this.findElement(By.className('install'));
        await button.click();
        await this.getDriver().wait(until.elementIsNotVisible(button));
    }
}