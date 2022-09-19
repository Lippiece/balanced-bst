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
const prettyPrint = ( node, prefix = "", isLeft = true ) => {

  if ( node.right !== undefined ) {

    prettyPrint( node.right, `${ prefix }${ isLeft ? "│   " : "    " }`, false );

  }
  console.log( `${ prefix }${ isLeft ? "└── " : "┌── " }${ node.data }` );
  if ( node.left !== undefined ) {

    prettyPrint( node.left, `${ prefix }${ isLeft ? "    " : "│   " }`, true );

  }

};
const immutableSort
 = array =>
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
    values =>
      makeTree(
        immutableSort(
          [...treeToArray( tree ), ...values]
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
    value =>
      ( tree.data === value
        ? tree
        : ( tree.data > value
          ? find( tree.left )( value )
          : find( tree.right )( value ) ) );
const traverseLevelOrder
  = tree =>
    callback =>
      ( queue = [tree] ) => {

        if ( queue.length === 0 ) { return }

        const node = queue[ 0 ];

        return traverseLevelOrder( tree )( callback )(
          enqueue( queue )( callback )
        );

      };
const enqueue
  = queue =>
    callback => {

      const node = queue[ 0 ];
      if ( node === undefined ) { return queue.slice( 1 ) }
      callback( node );
      return [
        ...queue.slice( 1 ),
        node.left,
        node.right,
      ];

    };
const traverseInOrder
  = tree =>
    callback => {

      if ( tree === undefined ) { return }
      traverseInOrder( tree.left )( callback );
      callback( tree );
      traverseInOrder( tree.right )( callback );

    };
const traversePreOrder
  = tree =>
    callback => {

      if ( tree === undefined ) { return }
      callback( tree );
      traversePreOrder( tree.left )( callback );
      traversePreOrder( tree.right )( callback );

    };
const traversePostOrder
  = tree =>
    callback => {

      if ( tree === undefined ) { return }
      traversePostOrder( tree.left )( callback );
      traversePostOrder( tree.right )( callback );
      callback( tree );

    };
const getHeight
  = tree => {

    if ( tree === undefined ) { return 0 }
    return 1 + Math.max(
      getHeight( tree.left ),
      getHeight( tree.right )
    );

  };
const getDepth
  = tree =>
    node => {

      if ( tree.data === node.data ) { return 0 }
      return 1 + (
        tree.data > node.data
          ? getDepth( tree.left )( node )
          : getDepth( tree.right )( node )
      );

    };
const array       = generateArray( 5 );
const initialTree = makeTree( array );
const tree        = insert( initialTree )( [100, 200, 300] );
console.log( "initial", array );
console.log( "------------------" );
prettyPrint( tree );
console.log( "------------------" );
console.log( "traverseLevelOrder" );
traverseLevelOrder( tree )( node =>
  console.log( node.data ) )();
console.log( "------------------" );
/*
const heightToFind = find( newTree )( 2 );
const depthToFind  = find( newTree )( newTree.data );
console.log( `Height of ${ heightToFind.data } is`, getHeight( heightToFind ) );
console.log( "------------------" );
console.log( `Depth of ${ depthToFind.data } is`, getDepth( newTree )( depthToFind ) );
console.log( "------------------" );
console.log( "height", getHeight( find() ) );
console.log( "------------------" );
console.log( "inserted" );
prettyPrint( insert( tree )( [66] ) );
console.log( "------------------" );
console.log( "find 66" );
console.log( find( insert( tree )( [66] ) )( 66 ) );
console.log( "------------------" );
console.log( "removed" );
prettyPrint( remove( tree )( 67 ) );
console.log( "------------------" );
console.log( "Inorder" );
traverseInOrder( tree )( node =>
  console.log( node.data ) );
*/
