

//TODO сделать настройки

import { Button } from "@components/common/buttons"

export const SettingsPage = () => {
    return <div>
        <div>
            Не заходи сюда, эти кнопки можно кликать, но они ничего не меняют
        </div>
        <div>
            <Button>
                Переключить тему
            </Button>
        </div>
        <div>
            <Button>
                Изменить язык
            </Button>
        </div>
        <div>
            <Button>
                Изменить валюту
            </Button>
        </div>
    </div>
}