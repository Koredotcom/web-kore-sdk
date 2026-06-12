export interface SearchResult {
  id: string;
  snippet: string;
  source: {
    title: string;
    type: string;
    url?: string;
    fileType?: string;
    imageUrls?: Array<string>;
  };
}

export function getSearchResults(payload: any): SearchResult[] {
  const results: Record<string, { data: Array<{ chunkResults: string[] }> }> = payload?.results ?? {};
  const chunkResultMap = new Map<string, any>(
    (Object.values(payload?.chunk_result ?? {}) as any[]).flat().map((cr: any) => [cr._source?.chunkId, cr._source])
  );

  const searchResults: SearchResult[] = [];
  for (const bucket of Object.values(results)) {
    for (const dataItem of bucket.data) {
      const chunkId = dataItem.chunkResults[0];
      if (!chunkId) continue;
      const src = chunkResultMap.get(chunkId);
      if (src) {
        const toArray = (val: any): string[] => {
          if (!val) return [];
          return Array.isArray(val) ? val : [val];
        };
        const imageUrls = toArray(src.page_image_url ?? src.chunkMeta?.imageUrl ?? src.image_url);
        searchResults.push({
          id: src.chunkId,
          snippet: src.chunkText,
          source: {
            title: src.recordTitle,
            type: src.sourceType,
            url: src.recordUrl,
            fileType: src.sys_file_type || src.fileType,
            imageUrls,
          },
        });
      }
    }
  }
  return searchResults;
}
