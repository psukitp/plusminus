import { PickerLocale } from "antd/es/date-picker/generatePicker";
import { Locale } from "./types";

export const genereateCalendarCfg = (locale: Locale): PickerLocale => {
    const isLangRu = locale === "ru"
    return {
        lang: {
            locale: isLangRu
                ? "ru"
                : "en",
            placeholder: isLangRu
                ? "Выбор даты"
                : "Select date",
            rangePlaceholder: isLangRu
                ? ["Начальная дата", "Конечная дата"]
                : ["Start date", "End date"],
            today: isLangRu
                ? "Сегодня"
                : "Today",
            now: isLangRu
                ? "Сейчас"
                : "Now",
            backToToday: isLangRu
                ? "Вернуться к сегодня"
                : "Back to today",
            ok: "OK",
            clear: isLangRu
                ? "Очистить"
                : "Clear",
            month: isLangRu
                ? "Месяц"
                : "Month",
            year: isLangRu
                ? "Год"
                : "Year",
            timeSelect: isLangRu
                ? "Выбор времени"
                : "Select time",
            dateSelect: isLangRu
                ? "Выбор даты"
                : "Select date",
            monthSelect: isLangRu
                ? "Выбор месяца"
                : "Choose a month",
            yearSelect: isLangRu
                ? "Выбор года"
                : "Choose a year",
            decadeSelect: isLangRu
                ? "Выбор декады"
                : "Choose a decade",
            yearFormat: "YYYY",
            dateFormat: "M/D/YYYY",
            dayFormat: "D",
            dateTimeFormat: "M/D/YYYY HH:mm:ss",
            monthFormat: "MMMM",
            monthBeforeYear: true,
            previousMonth: isLangRu
                ? "Прошлый месяц (PageUp)"
                : "Previous month (PageUp)",
            nextMonth: isLangRu
                ? "Следующий месяц (PageDown)"
                : "Next month (PageDown)",
            previousYear: isLangRu
                ? "Прошлый год (Control + left)"
                : "Last year (Control + left)",
            nextYear: isLangRu
                ? "Следующий год (Control + right)"
                : "Next year (Control + right)",
            previousDecade: isLangRu
                ? "Прошлая декада"
                : "Last decade",
            nextDecade: isLangRu
                ? "Следующая декада"
                : "Next decade",
            previousCentury: isLangRu
                ? "Прошлый век"
                : "Last century",
            nextCentury: isLangRu
                ? "Следующий век"
                : "Next century",
            shortWeekDays: isLangRu
                ? ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
                : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            shortMonths: isLangRu
                ? [
                    "Янв",
                    "Фев",
                    "Мар",
                    "Апр",
                    "Май",
                    "Июн",
                    "Июл",
                    "Авг",
                    "Сен",
                    "Окт",
                    "Ноя",
                    "Дек"
                ]
                : [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
        },
        timePickerLocale: {
            placeholder: isLangRu
                ? "Выбор времени"
                : "Select time",
        },
        dateFormat: "YYYY-MM-DD",
        dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
        weekFormat: "YYYY-wo",
        monthFormat: "YYYY-MM"
    }
}

export const getFormattedAmount = (amount: number | string) => {
    const stringAmount = amount.toString();
    const [integerPart, decimalPart] = stringAmount.split(/[.,]/);
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;
}