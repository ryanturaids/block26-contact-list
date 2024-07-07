import { useState, useEffect } from "react";

export default function SelectedContact({
  selectedContactId,
  setSelectedContactId,
}) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
        );
        const result = await response.json();
        setContact(result);
      } catch (error) {
        console.error(error);
      }
    }

    if (selectedContactId) {
      fetchContact();
    }
  }, [selectedContactId]);

  if (!contact) {
    return <p>Loading Selected Contact...</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="3">Contact Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Item</strong>
            </td>
            <td>
              <strong>Info</strong>
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{contact.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{contact.email}</td>
          </tr>
          <tr>
            <td>Website</td>
            <td>{contact.website}</td>
          </tr>
          <tr>
            <td>Company</td>
            <td>{contact.company.name}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{`${contact.address.street} ${contact.address.suite}, ${contact.address.city} ${contact.address.zipcode} (Lat: ${contact.address.geo.lat}, Long: ${contact.address.geo.lng})`}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => setSelectedContactId(null)}>
        Back to Contact List
      </button>
    </div>
  );
}
