export class NewsQueryOptions {
    private COUNTRIES: string[] = [
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
    ];

    private CATEGORIES: string[] = [
        'general',
        'technology',
        'business',
        'sports',
        'entertainment',
        'health',
        'science'
    ];

    getCountries(): string[] {
        return this.COUNTRIES;
    }

    getCategories(): string[] {
        return this.CATEGORIES;
    }
}
