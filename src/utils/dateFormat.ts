function timeSince(date: string) {
  var seconds = Math.floor(
    ((new Date() as unknown as number) -
      (new Date(date) as unknown as number)) /
      1000
  );
  var interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' min ago';
  }
  return Math.floor(seconds) + ' sec ago';
}

export { timeSince };
