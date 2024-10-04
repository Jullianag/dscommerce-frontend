import './styles.css';

export default function SearchBar() {

    return (
        <form className="dsc-search-bar">
            <button type="submit">
                <div className="dsc-search-bar-submit">
                    🔎︎
                </div>
            </button>
            <input type="text" placeholder="Nome do produto"/>
            <button type="reset">
                <div className="dsc-search-bar-reset">
                    🗙
                </div>
            </button>
        </form>
    );
}