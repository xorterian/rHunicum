// Encode ligatures for the ttf font
function ligatures(w) {
  return w.toLowerCase().
   replaceAll('á','A').replaceAll('é','E').
   replaceAll('í','I').replaceAll('ó','O').
   replaceAll('ö','q').replaceAll('ő','Q').
   replaceAll('ü','w').replaceAll('ű','W').
   replaceAll('ú','U').replaceAll('w','v').
   replaceAll('x','kS').replaceAll('y','i').
   replaceAll('cs','C').replaceAll('ccs','CC').
   replaceAll('gy','G').replaceAll('ggy','GG').
   replaceAll('ly','L').replaceAll('lly','LL').
   replaceAll('ny','N').replaceAll('nny','NN').
   replaceAll('sz','S').replaceAll('ssz','SS').
   replaceAll('ty','T').replaceAll('tty','TT').
   replaceAll('zs','Z').replaceAll('zzs','ZZ');
}

// Encode words without double ligatures
function degatures(w) {
  return w.replaceAll('CC','ccs').replaceAll('C','cs').
   replaceAll('GG','ggy').replaceAll('G','gy').
   replaceAll('LL','lly').replaceAll('L','ly').
   replaceAll('NN','nny').replaceAll('N','ny').
   replaceAll('SS','ssz').replaceAll('S','sz').
   replaceAll('TT','tty').replaceAll('T','ty').
   replaceAll('ZZ','zzs').replaceAll('Z','zs');
}

// Transform all text contents in an HTML tree
function transformAllTextNodes(node) {
  // Check if the node is an explicitly text node
  if (node.nodeType === Node.TEXT_NODE) {
      // Transform
      node.textContent = ligatures(node.textContent);
  } else {
      // If it is only potentially text content containing no subnodes or containing text-specific nodes like headers
      if ((typeof node.innerHTML == 'string' && node.innerHTML.search('<') == -1) || node.nodeName in ['H1','H2','H3','H4','LI']) {
        // Transform and set the font
        node.innerHTML = ligatures(node.innerHTML);
        node.parentNode.style = "font-family: runicFont;";// + String(node.parentNode.style);
      } else {
        // Iterate over the children
        node.childNodes.forEach(child => transformAllTextNodes(child));
      }
  }
}

// Do the transformation on the body.
transformAllTextNodes(document.body);
