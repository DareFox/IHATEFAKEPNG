export interface WebsiteUrlConverter {
    /**
     * Name of website
     */
    name: string
    /**
     * Check if URL has valid domain and can be converted in convertURL()
     * @param url Search URL to check
     */
    isUrlValid(url: URL): Boolean
    /**
     * Convert URL to transparent image search
     * @param url search url
     */
    convertURL(url: URL): URL;
}