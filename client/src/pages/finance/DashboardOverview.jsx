import { useState } from "react";
import { widgetRegistry } from "../../components/app-components/widgets/widgetRegistry";
import { getTotalWeight, getWidgetWeight } from "../../utils/widgetUtils";
import { VscSettings } from "react-icons/vsc";
import ManageWidgetsModal from "../../components/app-components/widgets/ManageWidgetsModal";

const DashboardOverview = () => {
    const [activeWidgets, setActiveWidgets] = useState(Object.keys(widgetRegistry));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [widgetLimitMessage, setWidgetLimitMessage] = useState('');

    const overviewWeight = getTotalWeight(activeWidgets, 'overview');
    const activityWeight = getTotalWeight(activeWidgets, 'activity');

    const sectionWeights = {
        overview: overviewWeight,
        activity: activityWeight,
    };

    const sectionLimits = {
        overview: 12,
        activity: 6,
    };

    const modalHandler = (activeWidgetKey) => {
        if (activeWidgets.includes(activeWidgetKey)) {
            setActiveWidgets((currentWidgets) =>
                currentWidgets.filter((key) => key !== activeWidgetKey)
            );
            setWidgetLimitMessage('');
            return;
        }

        const widget = widgetRegistry[activeWidgetKey];
        const currentWeight = getTotalWeight(activeWidgets, widget.section);
        const widgetWeight = getWidgetWeight(activeWidgetKey);
        const sectionLimit = sectionLimits[widget.section];

        if (currentWeight + widgetWeight > sectionLimit) {
            setWidgetLimitMessage(
                `${widget.section === 'overview' ? 'Overview' : 'Activity'} section limit exceeded.`
            );
            return;
        }

        setActiveWidgets((currentWidgets) => [...currentWidgets, activeWidgetKey]);
        setWidgetLimitMessage('');
    };

    return (
        <>
            <div className="flex flex-col w-[75%] pr-6">
                <div className="flex items-start justify-between pr-1.5 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-gray-400">Manage your finance and overview</p>
                    </div>

                    <div>
                        <button onClick={() => setIsModalOpen(true)}
                            className="flex rounded-xl border border-white/10 bg-white/3 px-3 py-2 text-sm text-gray-300 transition hover:border-violet-400/50 hover:bg-white/6 hover:text-white"
                        > <VscSettings className="text-xl text-violet-400 mr-1.5" />Widgets</button>
                    </div>

                </div>

                <div className="grid grid-cols-4 gap-4 auto-rows-37.5 grid-flow-row-dense pt-1">
                    {activeWidgets.map(activeWidgetKey => {
                        const widget = widgetRegistry[activeWidgetKey];

                        if (widget.section !== 'overview') return null;

                        const Widget = widget.component;

                        return <Widget key={activeWidgetKey} size={widget.size} />
                    })}
                </div>

                {isModalOpen && (
                    <ManageWidgetsModal
                        activeWidgets={activeWidgets}
                        onToggle={modalHandler}
                        onClose={() => setIsModalOpen(false)}
                        sectionWeights={sectionWeights}
                        sectionLimits={sectionLimits}
                        widgetLimitMessage={widgetLimitMessage}
                    />
                )}

            </div >

            <div className="w-[25%] border-l border-white/5 pl-6">

                <div className="grid grid-cols-2 gap-7 auto-rows-37.5">
                    {activeWidgets.map(activeWidgetKey => {
                        const widget = widgetRegistry[activeWidgetKey];

                        if (widget.section !== 'activity') return null;

                        const Widget = widget.component;

                        return <Widget key={activeWidgetKey} size={widget.size} />
                    })}
                </div>

            </div>

        </>
    );
};

export default DashboardOverview;