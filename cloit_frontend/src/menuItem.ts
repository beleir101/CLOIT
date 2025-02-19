type MenuItem = {
    id: number;
    name: string;
    parentId: number | null;
    depth: number;
  };
  
  export default MenuItem;