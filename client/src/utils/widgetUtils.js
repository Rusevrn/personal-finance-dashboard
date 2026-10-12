import { widgetRegistry } from '../components/app-components/widgets/widgetRegistry';
import { widgetSize } from '../components/app-components/widgets/widgetSize';

export const getWidgetWeight = (widgetKey) => {
    const { size } = widgetRegistry[widgetKey];
    const { columns, rows } = widgetSize[size];

    return columns * rows;
};

export const getTotalWeight = (activeWidgets, section) => {
    return activeWidgets.reduce((total, widgetKey) => {
        const widget = widgetRegistry[widgetKey];

        if (widget.section !== section) return total;

        return total + getWidgetWeight(widgetKey);
    }, 0);
};