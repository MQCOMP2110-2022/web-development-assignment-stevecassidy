# Level 3 and 4 Requirements

__Note:__ this document will be updated in a later release

## Level 3

1. Strapi backend configured to store the jobs and company data.  When the server
is running on port 1337 we can access the API and retrieve job and company details.
The endpoints should be `/api/jobs`, `/api/companies` and `/api/job-applications`.

2. Strapi backend API serves Job and Company records with [the correct fields](data.md).

3. The list of jobs on the main page, now generated from the Strapi API,
is in order of the `publishedAt` field
with more recent jobs shown first.   The ten most recent jobs are shown.  

4. There is a search box on every page to allow the user to search for jobs. 
The search box should be an `<input>` element with `id` of `search`. There
should also be a submit button with `id` of `searchbutton`. 
When I enter text into the search box and click the button, a search is performed
and jobs that contain the search term in the `description` field are
listed on the page.  (Note that for this initial implementation, search
terms can be restricted to single words - or more precisely, strings that are
contained in the description).

5. The search results page has the URL '/#!/search/TTTTT' where TTTTT is the 
search term that was entered.  This search term is displayed in the body
of the page in the phrase: `"Search results for 'TTTTT'"`.   Refreshing
the page (or visiting this URL directly) still shows the same result - that
is, I can perform a new search for 'Java' by visiting '/#!/search/Java' (e.g.
if I click on a link sent to me by someone else).

## Level 4

* User authentication
* Apply button on each job links to a form to apply for a job.
* Job application form linked up to creating a new JobApplication record in Strapi
* User page shows jobs applied for
* Users can 'star' companies and jobs so they appear on their user page
