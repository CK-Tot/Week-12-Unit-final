$(document).ready(function () {
    // Function to fetch and display movies
    function fetchMovies() {
        $.ajax({
            url: 'http://localhost:3000/movies',
            method: 'GET',
            success: function (data) {
                $('#movieList').empty();
                data.forEach(movie => {
                    $('#movieList').append(`
                        <li class="list-group-item bg-dark text-info">
                            <div class="d-flex justify-content-between  align-items-center">
                                <div>
                                    <strong>${movie.title}</strong> - ${movie.genre} - Directed by ${movie.director} - Released in ${movie.releaseYear}
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-info mr-2 editBtn" data-id="${movie.id}" data-title="${movie.title}" data-genre="${movie.genre}" data-director="${movie.director}" data-releaseyear="${movie.releaseYear}">Edit</button>
                                    <button class="btn btn-sm btn-danger deleteBtn" data-id="${movie.id}">Delete</button>
                                </div>
                            </div>
                        </li>
                    `);
                });
            }
        });
    }

    // Function to add a new movie
    $('#addMovieForm').submit(function (event) {
        event.preventDefault();
        const newMovie = {
            title: $('#movieTitle').val(),
            genre: $('#movieGenre').val(),
            director: $('#movieDirector').val(),
            releaseYear: $('#releaseYear').val()
        };
        $.ajax({
            url: 'http://localhost:3000/movies',
            method: 'POST',
            data: JSON.stringify(newMovie),
            contentType: 'application/json',
            success: function () {
                fetchMovies();
                $('#addMovieForm')[0].reset();
            }
        });
    });

    // Function to delete a movie
    $('#movieList').on('click', '.deleteBtn', function () {
        const id = $(this).data('id');
        $.ajax({
            url: `http://localhost:3000/movies/${id}`,
            method: 'DELETE',
            success: function () {
                fetchMovies();
            }
        });
    });

    // Function to edit a movie
    $('#movieList').on('click', '.editBtn', function () {
        const id = $(this).data('id');
        const title = $(this).data('title');
        const genre = $(this).data('genre');
        const director = $(this).data('director');
        const releaseYear = $(this).data('releaseyear');
        $('#movieTitle').val(title);
        $('#movieGenre').val(genre);
        $('#movieDirector').val(director);
        $('#releaseYear').val(releaseYear);
        $('#addMovieForm').off('submit').submit(function (event) {
            event.preventDefault();
            const updatedMovie = {
                title: $('#movieTitle').val(),
                genre: $('#movieGenre').val(),
                director: $('#movieDirector').val(),
                releaseYear: $('#releaseYear').val()
            };
            $.ajax({
                url: `http://localhost:3000/movies/${id}`,
                method: 'PUT',
                data: JSON.stringify(updatedMovie),
                contentType: 'application/json',
                success: function () {
                    fetchMovies();
                    $('#addMovieForm')[0].reset();
                    $('#addMovieForm').off('submit').submit(addMovie);
                }
            });
        });
    });

    // Initial fetch of movies
    fetchMovies();
});
