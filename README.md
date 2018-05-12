# Reference Converter

Reference converter (ACS vs WIREY) for scientific papers

## Scripting

```html
<script src="dist/reference-formatter.min.js" type="text/javascript"></script>
<script>
  const config = {
    data: '[1] K. Mikami, Org. Lett. 2015, 17, 4882-4885.',  // source reference text
    mode: 'wirey2acs',  // conversion mode [format|acs2wirey|wirey2acs]
  };
  const result = ReferenceConverter.convert(config);
  if (result.error) {
    console.log('ERROR:', result.error);
  } else {
    console.log(result.output);
  }
</script>
```

## Conversion Modes

- Simple Format
  - Journal title, publish year, and volume number are automatically stylized.
- Converting Format
  - ACS / WIREY styles are converted to each other, then stylized by Simple Format.

## Samples

The following reference text will be converted to each other and stylized.

- ACS Style

  ```
  [1] Aikawa, K.; Maruyama, K.; Honda, K.; Mikami, K. Org. Lett. 2015, 17, 4882-4885.
  [2] Ito, S.; Ueta, Y.; Ngo, T. T. T.; Kobayashi, M.; Hashizume, D.; Nishida, J.; Yamashita, Y.; Mikami, K. J. Am. Chem. Soc. 2013, 135, 17610-17616.
  [3] Iida, T.; Hashimoto, R.; Aikawa, K.; Ito, S. Angew. Chem. Int. Ed. 2012, 51, 9535-9538.
  ```
- WIREY Style

  ```
  [1] K. Aikawa, K. Maruyama, K. Honda, K. Mikami, Org. Lett. 2015, 17, 4882-4885.
  [2] S. Ito, Y. Ueta, T. T. T. Ngo, M. Kobayashi, D. Hashizume, J. Nishida, Y. Yamashita, K. Mikami, J. Am. Chem. Soc. 2013, 135, 17610-17616.
  [3] T. Iida, R. Hashimoto, K. Aikawa, S. Ito, Angew. Chem. Int. Ed. 2012, 51, 9535-9538.
  ```

## Specifications

- Leading indices such as `(1)`, `1)`, `[1]`, and `(a)` does not matter. However, presence of `1.` and `a.` may produce unexpected results.
- Multiple lines can be converted all at once. Each lines must have a single reference information.
