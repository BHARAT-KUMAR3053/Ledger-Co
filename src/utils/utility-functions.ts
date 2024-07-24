function checkForArguments(args: string[], length: number) {
  if (args.length !== length) {
    console.log('Invalid number of arguments');
  }
}

export { checkForArguments };
