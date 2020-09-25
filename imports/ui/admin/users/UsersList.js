import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { SEO } from "/imports/ui/components/SEO";
import { SearchInput } from "/imports/ui/components/SearchInput";
import UserItem from "/imports/ui/admin/users/UserItem";
import "/imports/ui/stylesheets/table.css";
import "/imports/ui/admin/users/styles.css";

export default UsersList = () => {
	const [filters, setfilters] = useState({ amount_page: 25, query: "", roles: "" });

	const { dataLoading, users } = useTracker(() => {
		const subs = Meteor.subscribe("users/list", filters);

		return {
			dataLoading: !subs.ready(),
			users: Meteor.users.find().fetch()
		};
	}, [filters]);

	useEffect(() => { window.prerenderReady = true; }, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setfilters({ ...filters, [name]: value });
	};

	return (
		<Fragment>
			<SEO
				title='Users Administration'
				description='Welcome to the users administration section.'
				contentType="website"
				path='admin/users'
			/>

			<SearchInput
				field="query"
				value={filters.query}
				placeholder="Search user by email"
				saveCallback={handleChange}
			/>

			<div className="table">
				{dataLoading ? <p>Loading...</p> : users.map(user => <UserItem key={user._id} user={user} />)}
			</div>
			{users.length > filters.amount_page && <button onClick={() => setfilters({ ...filters, amount_page: filters.amount_page + 25 })}>Load More</button>}
		</Fragment>
	);
};
