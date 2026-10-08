
const DashWidget = ({ size, children }) => {

    const widgetSize = {
        'small': 'col-span-1 row-span-1',
        'medium': 'col-span-2 row-span-1',
        'large': 'col-span-2 row-span-2',
        'wide': 'col-span-4 row-span-1',
        'long': 'col-span-2 row-span-3',
    }

    return (
        <div className={`${widgetSize[size]} rounded-2xl border border-white/8 bg-white/2.5 p-4`}>
            {children}
        </div>
    );
};

export default DashWidget;