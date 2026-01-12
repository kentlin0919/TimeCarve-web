try {
  const popover = require.resolve('@radix-ui/react-popover');
  console.log('Success: Found @radix-ui/react-popover at', popover);
} catch (e) {
  console.error('Error: Could not resolve @radix-ui/react-popover');
  console.error(e.message);
}
