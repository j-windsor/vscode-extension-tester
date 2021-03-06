import { LocatorDiff } from "monaco-page-objects";
import { By } from "selenium-webdriver";

export const diff: LocatorDiff = {
    locators: {
        NotificationsCenter: {
            close: By.className('codicon-close'),
            clear: By.className('codicon-clear-all')
        }
    }
}