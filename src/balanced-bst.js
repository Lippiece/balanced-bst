const generateArray
  = length =>
    [...( Array( length ) )
      .fill( 0 )
      .map( () =>
        Math.floor( Math.random() * length * 10 ) )
      .filter( ( item, index, array ) =>
        array.indexOf( item ) === index )]
      .sort( ( next, previous ) =>
        next - previous );
const makeNode
  = data =>
    left =>
      right =>
        ( {
          data,
          left,
          right,
        } );
const makeRight = right =>
  ( right.length > 0 ? makeTree( right ) : undefined );
const makeLeft  = left =>
  ( left.length > 0 ? makeTree( left ) : undefined );
const makeTree
= array => {

  const middle = Math.floor( array.length / 2 );
  const left   = array.slice( 0, middle );
  const right  = array.slice( middle + 1 );

  return makeNode( array[ middle ] )(
    makeLeft( left )
  )(
    makeRight( right )
  );

};
const printTree
  = tree => {

    if ( tree === undefined ) { return "" }
    return `${ printTree( tree.left ) } ${
      tree.data } ${  printTree( tree.right ) }`;

  };
const prettyPrint   = ( node, prefix = "", isLeft = true ) => {

  if ( node.right !== undefined ) {

    prettyPrint( node.right, `${ prefix }${ isLeft ? "│   " : "    " }`, false );

  }
  console.log( `${ prefix }${ isLeft ? "└── " : "┌── " }${ node.data }` );
  if ( node.left !== undefined ) {

    prettyPrint( node.left, `${ prefix }${ isLeft ? "    " : "│   " }`, true );

  }

};
const immutableSort = array =>
  [...array].sort( ( next, previous ) =>
    next - previous );
const treeToArray
  = tree => {

    if ( tree === undefined ) { return [] }
    return [
      ...treeToArray( tree.left ),
      tree.data,
      ...treeToArray( tree.right ),
    ];

  };
const insert
  = tree =>
    value =>
      makeTree(
        immutableSort(
          [...treeToArray( tree ), value]
        )
      );
const remove
  = tree =>
    value => {

      const array    = treeToArray( tree );
      const newArray = array.filter( item =>
        item !== value );
      return makeTree( newArray );

    };
const find
  = tree =>
    value => {

      const array = treeToArray( tree );
      if ( !array.includes( value ) ) { return "Not Found" }
      return array.indexOf( value );

    };
const array = generateArray( 15 );
const tree  = makeTree( array );
console.log( "initial", array );
prettyPrint( tree );
console.log( "inserted" );
prettyPrint( insert( tree )( 999 ) );
console.log( "removed" );
prettyPrint( remove( tree )( 67 ) );
console.log( "find 66" );
console.log( find( tree )( 66 ) );
