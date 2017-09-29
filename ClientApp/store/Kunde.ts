import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface KundeState {
    oid: string;
    name: string;
    givenName: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface SetNameAction { type: 'SET_NAME', name: string }
interface SetGivenNameAction { type: 'SET_GIVEN_NAME', givenName: string }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetNameAction | SetGivenNameAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setName: (name: string) => <SetNameAction>{ type: 'SET_NAME', name },
    setGivenName: (givenName: string) => <SetGivenNameAction>{ type: 'SET_GIVEN_NAME', givenName }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = { oid: '00000000-0000-0000-0000-000000000000', name: '', givenName: '' };

export const reducer: Reducer<KundeState> = (state: KundeState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.name };
        case 'SET_GIVEN_NAME':
            return { ...state, givenName: action.givenName };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};
