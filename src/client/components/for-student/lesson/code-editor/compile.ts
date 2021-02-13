export const compile = (code: string): string => {
  const YobaReplacement = (code: string): string => {
    const regex = /console\.log\((.*?)\)/g

    function YobaReplacer(match: string, innerGroup: string) {
      return `MyVar += (${innerGroup}+' ')`
    }
    return code.replace(regex, YobaReplacer)
  }
  const YobaMethod = (code: string) => {
    return `let MyVar='';${code};MyVar;`
  }
  code = YobaReplacement(code)
  code = YobaMethod(code)
  console.log(code)
  try {
    // eslint-disable-next-line no-eval
    return eval(code)
  } catch (e) {
    return e.message
  }
}
