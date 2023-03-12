export const APP_IP =
  process.env.NODE_ENV === 'production'
    ? 'http://172.31.24.118:5000/graphql'
    : 'http://localhost:5000/graphql';

export async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(APP_IP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body);
    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        window.alert(`${error.message}:\n ${details}`);
      } else if (error.extensions.code === 'FORBIDDEN') {
        window.alert(error.message);
      } else {
        window.alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (err) {
    window.alert(`${err}`);
  }
  return undefined;
}
