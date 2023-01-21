interface Country {
    name: string,
    iso: string
}

export class NewsQueryOptions {
    // default valid country code to thwart pesky hackers
    defaultCountryIso = 'us';

/*     private COUNTRIES: string[] = [
        'us', 'ae', 'ar', 'at', 'au',
        'be', 'bg', 'br', 'ca',
        'ch', 'cn', 'co', 'cu',
        'cz', 'de', 'eg', 'fr',
        'gb', 'gr', 'hk', 'hu',
        'id', 'ie', 'il', 'in',
        'it', 'jp', 'kr', 'lt',
        'lv', 'ma', 'mx', 'my',
        'ng', 'nl', 'no', 'nz',
        'ph', 'pl', 'pt', 'ro',
        'rs', 'ru', 'sa', 'se',
        'sg', 'si', 'sk', 'th',
        'tr', 'tw', 'ua', 'us',
        've', 'za'
    ]; */

    getCategories(): string[] {
        return [
            'general',
            'technology',
            'business',
            'sports',
            'entertainment',
            'health',
            'science'
        ];
    }

    getCountriesObjects(): Country[] {
        return [
            { name: 'United States', iso: 'us' },
            { name: 'Argentina', iso: 'ar' },
            { name: 'Australia', iso: 'au' },
            { name: 'Austria', iso: 'at' },
            { name: 'Belgium', iso: 'be' },
            { name: 'Brazil', iso: 'br'},
            { name: 'Bulgaria', iso: 'bg' },
            { name: 'Canada', iso: 'ca' },
            { name: 'China', iso: 'cn' },
            { name: 'Great Britain', iso: 'gb' },
            { name: 'Mexico', iso: 'mx' },
            { name: 'New Zealand', iso: 'nz' },
            { name: 'Switzerland', iso: 'ch'},
            { name: 'United Arab Emirates', iso: 'ae' },
        ];
    }

    getCountryFullNames() {
        let l = [];
        for (let c of this.getCountriesObjects()) {
            l.push(c.name);
        }
        return l;
    }
}
