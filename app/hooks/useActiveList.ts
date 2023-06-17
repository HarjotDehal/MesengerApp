import {create} from 'zustand';

interface ActiveListStore{

        // properties for our store which holds information. 

        members:string[],
        add: (id:string) => void,
        remove: (id: string) => void;
        set: (ids: string[]) => void;
    }
    
    const useActiveList = create<ActiveListStore>((set) => ({

        // creates our store with attributes 


        members: [],
        add: (id) => set((state) => ({ members: [...state.members, id] })),
        remove: (id) => set((state) => ({ members: state.members.filter((memberId) => memberId !== id) })),
                // removes members not needed from filter. 

        set: (ids) => set({ members: ids })
    }));
    
  export default useActiveList;