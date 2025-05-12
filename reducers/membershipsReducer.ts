import { Membership } from "@/types/membership";

export interface MembershipsState {
    memberships: Membership[] | undefined,
    selectedMembership: Membership | undefined,
}

export type MembershipsAction = 
    { type: "SET_MEMBERSHIPS"; payload?: Membership[] | undefined } |
    { type: "SET_SELECTED_MEMBERSHIP", payload?: Membership | undefined };


export function membershipsReducer(
    state: MembershipsState, 
    action: MembershipsAction): MembershipsState {
    switch (action.type) {
        case "SET_MEMBERSHIPS":
            return {
                ...state,
                memberships: action?.payload,
            };
        case "SET_SELECTED_MEMBERSHIP":
            return {
                ...state,
                selectedMembership: action?.payload,
            }
        default:
            return state;
    }
}