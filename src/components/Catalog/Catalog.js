import CatalogItem from './CatalogItem/CatalogItem';

/* eslint-disable jsx-a11y/alt-text */
const Catalog = ({games}) => {
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {/* Display div: with information about every game (if any) */}
            {games.length > 0
            ? games.map(el => <CatalogItem game={el} />)
            : <h3 className="no-articles">No articles yet</h3>
            }
            
            {/* Display paragraph: If there is no games */}
        </section>
    );
};

export default Catalog;