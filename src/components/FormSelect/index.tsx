import Select from "react-select";

export default function FormSelect(props: any) {

    const {
        className,
        validation,
        invalid = "false",
        dirty = "false",
        onTurnDirty,
        ...selectProps
    } = props;

    function handleBlur() {
        onTurnDirty(props.name);
    }

    return (
        <div
            // className aqui pq o dive q tem o data-invalid e data-dirty
            className={className}
            data-invalid={invalid}
            data-dirty={dirty}
        >
            <Select
                { ...selectProps }
                onBlur={handleBlur}
            />
        </div>

    );
}