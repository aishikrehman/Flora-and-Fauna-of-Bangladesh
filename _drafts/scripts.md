<!-- <script>
    $(document).ready(function () {
        $("#SpeciesList").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#SpeciesList tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
</script> -->


            <!-- {% assign plant_pages = site.pages | where: "layout", "plant" %}
            {% assign grouped_pages = plant_pages | group_by: "Species" | sort: "name" %}
            
            {% for group in grouped_pages %}
              <h2>{{ group.name | upcase }}</h2>
              <ul>
                {% for page in group.items %}
                  <li><a href="{{ page.url }}">{{ page.Species }}</a></li>
                {% endfor %}
              </ul>
            {% endfor %} -->