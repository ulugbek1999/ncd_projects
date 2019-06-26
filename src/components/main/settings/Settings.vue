<template>
    <div class="col">
        <h1 class="personal-information">Personal information</h1>
        <div class="profile">
            <h5>Profile</h5>
            <table class="table table-hover">
                <tbody>
                    <tr>
                    <th scope="col-4">Photo</th>
                    <td scope="col" style="font-size: 13px; color: #555">You can upload your photo</td>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                    <tr>
                    <th scope="row">Name</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
                </table>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Bree+Serif&display=swap');
    .personal-information {
        border-bottom: 1px solid lightgray;
        padding: 0 0 20px;
        font-family: 'Bree Serif', serif;
    }

    h5 {
        font-size: 1.384rem;
    }

    .profile {
        border: 1px solid #dadce0;
        padding: 25px 20px;
        margin-top: 30px;
        width: 800px;
        border-radius: 7px;
    }

    .table {
        margin-top: 30px;
    }

    .table tr:hover {
        cursor: pointer;
    }
</style>
