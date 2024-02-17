import { ChartWidget, SmallWidget } from "../widgets";
import './ReviewPage.less';
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const ReviewPage = () => {
  const layout = {
    lg: [
      { i: "exp-by-month", x: 0, y: 0, w: 3, h: 1 },
      { i: "inc-by-month", x: 3, y: 0, w: 3, h: 1 },
      { i: "remainder", x: 6, y: 0, w: 3, h: 1 },
      { i: "forecast", x: 9, y: 0, w: 3, h: 1 },
      { i: "exp-by-category", x: 0, y: 1, w: 6, h: 2.2 },
      { i: "exp-dynamic", x: 6, y: 1, w: 6, h: 2.2 },
      { i: "inc-dynamic", x: 0, y: 1.2, w: 12, h: 2.75 }
    ]
  }

  return (
    <div className="review">
      <ResponsiveGridLayout
        className='layout'
        layouts={layout}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={150}
        isDraggable={false}
        width={1200}>
        <div key="exp-by-month">
          <SmallWidget
            title='Расход за месяц'
            text='18 171 ₽' />
        </div>
        <div key="inc-by-month">
          <SmallWidget
            title='Доход за месяц'
            text='123 175 ₽' />
        </div>
        <div key="remainder">
          <SmallWidget
            title='Остаток от дохода'
            text='104 434 ₽' />
        </div>
        <div key="forecast">
          <SmallWidget
            title='Прогноз расходов'
            text='60 388 ₽' />
        </div>
        <div key="exp-by-category">
          <ChartWidget
            title='Расходы по категориями'
            text='Тут будет график' />
        </div>
        <div key="exp-dynamic">
          <ChartWidget
            title='Расходы за N месяцев'
            text='Тут будет график' />
        </div>
        <div key="inc-dynamic">
          <ChartWidget
            title='Доходы за N месяцев'
            text='Тут будет график' />
        </div>
      </ResponsiveGridLayout>
    </div>
  )
}