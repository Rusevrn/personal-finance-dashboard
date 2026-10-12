import { widgetSize } from "./widgetSize";

const DashWidget = ({ size, children }) => {

    return (
        <div className={`${widgetSize[size].className} rounded-2xl border border-white/8 bg-white/2.5 p-4`}>
            {children}
        </div>
    );
};

export default DashWidget;