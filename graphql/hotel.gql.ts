
export const HOTELS_QUERY = `
  query Hotels {
    hotels {
      id
      name
      city
      status
    }
  }
`;

export const SWITCH_HOTEL_MUTATION = `
  mutation SwitchHotel($hotelId: ID!) {
    switchHotel(hotelId: $hotelId) {
      success
    }
  }
`;
