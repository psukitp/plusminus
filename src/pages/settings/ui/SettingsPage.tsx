
//TODO сделать настройки

import { Button } from "@shared/ui"

const SettingsPage = () => {
    return <div>
        <div>
            Не заходи сюда, эти кнопки можно кликать, но они ничего не меняют
        </div>
        <div>
            <Button onClick={() => console.log("Ладно, что-то все-таки делают. В консоль пишут:)")}>
                Переключить тему
            </Button>
        </div>
        <div>
            <Button onClick={() => console.log("Ладно, что-то все-таки делают. В консоль пишут:)")}>
                Изменить язык
            </Button>
        </div>
        <div>
            <Button onClick={() => console.log("Ладно, что-то все-таки делают. В консоль пишут:)")}>
                Изменить валюту
            </Button>
        </div>
    </div>
}

export default SettingsPage