import { widgetRegistry } from '../components/app-components/widgets/widgetRegistry';
import { widgetSize } from '../components/app-components/widgets/widgetSize';

type WidgetSize = keyof typeof widgetSize;

export const getWidgetWeight = (widgetKey: keyof typeof widgetRegistry) => {
    const { size }: {size: WidgetSize} = widgetRegistry[widgetKey];
    const { columns, rows } = widgetSize[size];

    return columns * rows;
};

export const getTotalWeight = (activeWidgets: (keyof typeof widgetRegistry)[], section: string) => {
    return activeWidgets.reduce((total: number, widgetKey) => {
        const widget = widgetRegistry[widgetKey];

        if (widget.section !== section) return total;

        return total + getWidgetWeight(widgetKey);
    }, 0);
};