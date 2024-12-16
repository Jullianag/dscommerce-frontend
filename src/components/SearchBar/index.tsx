import './styles.css';
import {useState} from "react";

type Props = {
    onSearch: Function;
}

export default function SearchBar({ onSearch }: Props) {

    const [text, setText] = useState("");

    function handleChange(event: any) {
        setText(event.target.value);
    }

    function handleResetClick() {
        setText("");
        onSearch(text);
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        onSearch(text)
    }

    return (
        <form className="dsc-search-bar" onSubmit={handleSubmit}>
            <button type="submit">
                <div className="dsc-search-bar-submit">
                    🔎︎
                </div>
            </button>
            <input
                value={text}
                type="text"
                placeholder="Nome do produto"
                // sempre que alterar o input
                onChange={handleChange}
            />
            <button onClick={handleResetClick}>
                <div className="dsc-search-bar-reset">
                    🗙
                </div>
            </button>
        </form>
    );
}