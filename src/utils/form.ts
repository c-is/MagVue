/*!
 * Serialize all form data into a query string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   form The form to serialize
 * @return {String}      The serialized form data
 */
const serialise = (form: HTMLFormElement) => {
  // Setup our serialized data
  const serialized = [];

  // Loop through each field in the form
  for (let i = 0; i < form.elements.length; i += 1) {
    const field = form.elements[i] as HTMLInputElement;

    // Don't serialize fields without a name, submits, buttons,
    // file and reset inputs, and disabled fields
    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') {
      // eslint-disable-next-line
      continue;
    }

    // If a multi-select, get all selections
    if (field.type === 'select-multiple') {
      const select = form.elements[i] as HTMLSelectElement;

      for (let n = 0; n < select.options.length; n += 1) {
        // eslint-disable-next-line
        if (!select.options[n].selected) { continue };

        serialized.push(
          `${encodeURIComponent(select.name)}=${encodeURIComponent(select.options[n].value)}`
        );
      }
    // eslint-disable-next-line brace-style
    }

    // Convert field data to a query string
    else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      serialized.push(`${encodeURIComponent(field.name)}=${encodeURIComponent(field.value)}`);
    }
  }

  return serialized.join('&');
};

export {
  serialise,
};
