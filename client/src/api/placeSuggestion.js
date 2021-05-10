export const fetchCities = async(search) => {
  const url = `https://places-dsn.algolia.net/1/places/query`;
  const res = await (
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        query: search,
        type: 'city',
        language: 'en',
      }),
    })
  ).json();

  const result = [];
  res.hits.forEach((i) => result.push(i.locale_names[0]));

  return result;
};
