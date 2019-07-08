<template>
    <div>
        <div style="display: flex; justify-content: space-between">
            <h2>All available courses</h2>
            <button class="add-course"><span style="margin-right: 5px; font-weight: bold">+</span>Add course</button>
        </div>
        
        <div class="course">
            <div class="row">
                <div class="col-md-3">
                    <div class="course-img-holder" :style="{backgroundImage: 'url(\'https://cdn-images-1.medium.com/max/1200/1*EPHVYygppZ2py-HQ57CSqA.jpeg\')'}"></div>
                </div>
                <div class="col">
                    <h4 style="margin-bottom: 0 !important">New English File</h4>
                    <div class="metadata">
                        <ul>
                            <li>123 lessons</li>
                            <li>6 chapters</li>
                            <li>All levels</li>
                        </ul>
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Patua+One&display=swap');

    h2 {
        font-family: 'Patua One', 'Arial', cursive;
        margin-bottom: 20px;
    }

    .course {
        min-height: 160px;
        margin: 20px 0;
        padding: 10px 10px;
    }

    .course:hover {
        cursor: pointer;
        background-color: rgb(230, 230, 230);
    }

    .course-img-holder {
        width: 200px;
        height: 150px;
        background: {
            size: cover;
            position: center;
        }
    }

    .add-course {
        border: none;
        padding: 0 25px;
        max-height: 40px;
        background-color: rgb(7, 7, 182);
        color: #fff;
        opacity: 0.8;
        transition: opacity .2s ease;
    }

    .add-course:hover {
        opacity: 1
    }

    .course h4 {
        font-family: 'Open Sans', Helvetica, sans-serif;
        font: {
            size: 1.4rem;
        }
    }

    .metadata {
        margin-top: 5px;
    }

    .metadata ul {
        padding: 0;
        margin: 0;
    }

    .metadata ul > li {
        list-style-type: none;
        float: left;
        font-size: 14px;
        color: rgb(141, 135, 135)
    }

    .metadata ul > li::after {
        content: '\25CF';
        margin: 0 10px;
        font-size: 12px;
    }

    .metadata ul > li:last-of-type {
        float: unset;
    }

    .metadata ul > li:last-of-type::after {
        content: unset
    }
</style>
